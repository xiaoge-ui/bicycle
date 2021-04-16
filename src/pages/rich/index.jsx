import React, { Component } from 'react';
import { Card, Button, Modal } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default class Rich extends Component {

    state = {
        visible: false
    }
    render() {
        return (
            <div>
                <Card title="操作按钮">
                    <Button type="primary" onClick={this.haddleClick} style={{ marginRight: 10 }}>查看内容</Button>
                    <Button type="primary" onClick={this.haddleEmpty}>清空内容</Button>
                </Card>
                <Card title="富文本" style={{ margin: "10px 0" }}>
                    <Editor
                        editorState={this.state.editorState}
                        onContentStateChange={this.onContentStateChange}
                        onEditorStateChange={this.onEditorStateChange}
                    />
                </Card>
                <Modal
                    title="选中的文本"
                    visible={this.state.visible}
                    onCancel={() => this.setState({ visible: false })}
                    footer={null}
                >
                    {draftToHtml(this.state.context)}
                </Modal>
            </div >
        )
    }
    //编辑事，存储数据
    onEditorStateChange = (editorState) => {
        this.setState({ editorState });
    }
    //获取输入的值
    onContentStateChange = (context) => {
        this.setState({ context });
    }

    haddleClick = () => {
        this.setState({ visible: true });
    }

    haddleEmpty = () => {
        this.setState({ editorState: "", context: "" });
    }

}
