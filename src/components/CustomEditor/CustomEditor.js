import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect
} from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { api } from 'services';

function CustomEditor(props, ref) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (props.defaultValue) {
      const contentBlock = htmlToDraft(props.defaultValue);
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
  }, [props.defaultValue]);

  const onEditorStateChange = editor => {
    setEditorState(editor);
  };

  const uploadImageCallBack = async file => {
    const res = await api.uploadResource({ file, type: 'article' });
    if (res.ok && res.success) {
      return await {
        data: {
          link: res.payload.data
        }
      };
    } else {
      return await res.payload;
    }
  };

  useImperativeHandle(ref, () => ({
    getContent: () => {
      const str = draftToHtml(convertToRaw(editorState.getCurrentContent()));
      return str;
    },
    resetContent: () => {
      setEditorState(EditorState.createEmpty());
    }
  }));

  return (
    <Editor
      editorState={editorState}
      // toolbarClassName="toolbarClassName"
      // wrapperClassName="wrapperClassName"
      // editorClassName="editorClassName"
      wrapperStyle={{
        border: '1px solid rgba(0, 0, 0, 0.87)',
        borderRadius: '6px',
        marginTop: 10
      }}
      editorStyle={{
        padding: '0 10px'
      }}
      onEditorStateChange={onEditorStateChange}
      toolbar={{
        image: {
          urlEnabled: true,
          uploadEnabled: true,
          alignmentEnabled: true,
          uploadCallback: uploadImageCallBack,
          previewImage: true,
          inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
          alt: { present: false, mandatory: false },
          defaultSize: {
            height: 'auto',
            width: 'auto'
          }
        }
      }}
    />
  );
}

export default forwardRef(CustomEditor);
