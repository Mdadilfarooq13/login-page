import { Upload, Layout, Table } from 'antd';
import Sidebar from "../components/sidebar.js";
import Header from '../components/header.js'
import { InboxOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import Papa from 'papaparse';

const { Content, Sider } = Layout;
const Dragger = Upload.Dragger;

function Input() {
  const [fileData, setFileData] = useState([]);

  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result;
      Papa.parse(text, {
        header: true,
        complete: (result) => {
          const headers = result.meta.fields;
          const parsedData = result.data;

          const tableColumns = headers.map(header => ({
            title: header,
            dataIndex: header,
            key: header,
          }));

          const newData = {
            fileName: file.name,
            columns: tableColumns,
            data: parsedData,
          };

          setFileData(prevData => [...prevData, newData]);
        },
      });
    };
    reader.readAsText(file);
    return false;
  };

  const props = {
    name: 'file',
    multiple: true,
    showUploadList: false,
    height: 180,
    beforeUpload: handleFileUpload,
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Header />
      <Layout>
        <Sider width={200} style={{
          overflow: 'auto',
          insetInlineStart: 0,
          top: 0,
          bottom: 0,
          backgroundColor: 'white',
          scrollbarWidth: 'thin',
          scrollbarColor: 'unset',
        }}>
          <Sidebar />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content style={{ 
            padding: '24px', 
            margin: 0,
            overflow: 'auto',
            insetInlineStart: 0,
            top: 0,
            bottom: 0,
            scrollbarWidth: 'thin',
            scrollbarColor: 'unset',
            }}>
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag files to this area to upload</p>
            </Dragger>
            {fileData.map((file, index) => (
              <div key={index} style={{ marginTop: 20 }}>
                <h3>{file.fileName}</h3>
                <Table
                  dataSource={file.data}
                  columns={file.columns}
                  rowKey={(record) => record[file.columns[0]?.dataIndex]}
                />
              </div>
            ))}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default Input;