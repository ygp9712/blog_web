import React, { useEffect, useRef, useState } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css'
import Clipboard from 'clipboard';
import styles from './CodeBlock.module.css'
// import 'highlight.js/styles/default.css';

interface IParams {
    language: string
    code: string
}


export default function CodeBlock(params: IParams) {
  const { language, code } = params;
  const preRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    console.log('点击了')
  }

  return (
    <div className="codeBox" style={{ position: 'relative'}}>
      <pre style={{whiteSpace: 'break-spaces'}}>
        <code id={language} ref={preRef} className={language} dangerouslySetInnerHTML={{__html: hljs.highlight(code, {language: language}).value}}>
        </code>
      </pre>
      <button onClick={() => handleCopy()} id={`${language}copy_btn`} style={{ position: 'absolute', top: 4, right: 4, lineHeight: '14px' }} className="code-block__button" data-clipboard-target={`#${language}`} >
        {copied ? '已复制' : '复制'}
      </button>
    </div>
  );
}
