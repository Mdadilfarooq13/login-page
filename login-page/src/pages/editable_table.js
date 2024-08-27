import MainLayout from "../components/main_layout.js";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Form, Input, Table, Button } from "antd";

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingInlineEnd: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

async function fetchItems() {
  const response = await fetch("http://127.0.0.1:8000");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  // console.log(data)
  return data;
}

const EditableTable = () => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchItems();
        setDataSource(data || []);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    };

    loadData();
  }, []);

  const defaultColumns = [
    {
      title: "column1",
      dataIndex: "column1",
      width: "30%",
      editable: true,
    },
    {
      title: "column2",
      width: "30%",
      dataIndex: "column2",
      editable: true,
    },
    {
      title: "column3",
      width: "40%",
      dataIndex: "column3",
      editable: true,
    },
  ];

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const handleSaveTable = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataSource),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      console.log('Data saved successfully:', result);
    } catch (error) {
      console.error('Failed to save table data:', error);
    }
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <MainLayout>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns}
      />
      <Button
        type="primary"
        style={{ marginTop: 16 }}
        onClick={handleSaveTable}
      >
        Save Table
      </Button>
    </MainLayout>
  );
};

export default EditableTable;
