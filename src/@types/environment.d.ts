declare global {
    namespace NodeJS {
      interface ProcessEnv { // 声明env环境下拥有的变量
        GITHUB_AUTH_TOKEN: string;
        NODE_ENV: 'development' | 'production';
        PORT?: string;
        PWD: string;
        MONGO: string
      }
    }
  }
  
  // If this file has no import/export statements (i.e. is a script)
  // convert it into a module by adding an empty export statement.
  export {}