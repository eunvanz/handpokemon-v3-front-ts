// import React, { memo } from 'react';
// import CKEditor from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import '@ckeditor/ckeditor5-build-classic/build/translations/ko.js';
// import MyUploadAdapter from '../../libs/fileUploadAdapter';
import { API_BASE_URL } from '../../constants/api';
// import { Editor as DraftEditor } from 'react-draft-wysiwyg';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import React, { memo } from 'react';

// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/js/languages/ko.js';
import 'froala-editor/js/plugins/align.min.js';
import 'froala-editor/js/plugins/colors.min.js';
import 'froala-editor/js/plugins/draggable.min.js';
import 'froala-editor/js/plugins/image.min.js';
import 'froala-editor/js/plugins/video.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/plugins/colors.min.css';
import 'froala-editor/css/plugins/draggable.min.css';
import 'froala-editor/css/plugins/image.min.css';
import 'froala-editor/css/plugins/video.min.css';

// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';

import FroalaEditor from 'react-froala-wysiwyg';

const Editor = props => {
  return (
    <FroalaEditor
      tag='text-area'
      config={{
        key: 'vA2C7D6F6oF4I4E3C7A3B5A4B2B3H4bvtgnvakebzB9idF6fA-8==',
        placeholderText: '내용을 입력해주세요.',
        language: 'ko',
        imageUploadParam: 'file',
        imageUploadRemoteUrls: true,
        imageUploadURL: `${API_BASE_URL}/files?path=article-images`
      }}
      {...props}
    />
  );
};

export default memo(Editor);
