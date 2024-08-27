import { Upload, Table, Collapse, Button } from "antd";
import MainLayout from "../components/main_layout.js";
import { InboxOutlined, DeleteOutlined } from "@ant-design/icons";
import React, { useContext } from "react";
import Papa from "papaparse";
import { FileDataContext } from "../context/file_data_context.js";

const Dragger = Upload.Dragger;
const { Panel } = Collapse;

function InputData() {
  const { fileData, setFileData } = useContext(FileDataContext);
  // const [fileData, setFileData] = useState([]);

  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result;
      Papa.parse(text, {
        header: true,
        complete: (result) => {
          const headers = result.meta.fields;
          const parsedData = result.data;

          const tableColumns = headers.map((header) => ({
            title: header,
            dataIndex: header,
            key: header,
          }));

          const newData = {
            fileName: file.name,
            columns: tableColumns,
            data: parsedData,
            uid: file.uid,
          };

          setFileData((prevData) => [...prevData, newData]);
        },
      });
    };
    reader.readAsText(file);
    return false;
  };

  const handleFileRemove = (uid) => {
    setFileData((prevData) => prevData.filter((item) => item.uid !== uid));
  };

  const fileColumns = [
    {
      render: (_, record, index) => `${index + 1}. ${record.fileName}`,
    },
    {
      render: (_, record) => (
        <div style={{ textAlign: "right" }}>
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => handleFileRemove(record.uid)}
          />
        </div>
      ),
    },
  ];

  const props = {
    name: "file",
    multiple: true,
    showUploadList: false,
    height: 180,
    beforeUpload: handleFileUpload,
  };

  return (
    <MainLayout>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag files to this area to upload
        </p>
      </Dragger>
      <Table
        showHeader={false}
        columns={fileColumns}
        dataSource={fileData}
        rowKey="uid"
        size="small"
        style={{ marginTop: 20 }}
        pagination={false}
      />
      <Collapse style={{ marginTop: 20 }}>
        {fileData.map((file) => (
          <Panel header={file.fileName} key={file.uid}>
            <Table dataSource={file.data} columns={file.columns} />
          </Panel>
        ))}
      </Collapse>
    </MainLayout>
  );
}

export default InputData;
