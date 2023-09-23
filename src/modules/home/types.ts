export namespace IEntity {
  export interface Book {
    id: string;
    title: string;
    description: string;
    pageCount: number;
    publishedDate: string;
    publisher: string;
    language: string;
    previewLink: string;
    image: string;
    authors: string[];
    downloadPdf: string;
    accessDownloadPdf: boolean;
    selfLink: string;
  }

  export interface User {
    displayName: string;
    email: string;
  }
}
export namespace Ifunction {
  export interface Auth {
    email: string;
    password: string;
  }
  export interface UpdateProfile {
    name: string;
  }
  export interface Register extends Auth {}
  export interface Login extends Auth {}
}

export namespace Api {
  export namespace Book {
    export namespace List {
      export interface Request {
        search: string;
        startIdx: number;
      }
      export interface Respons {
        items: IEntity.Book[];
      }
    }
    export namespace Single {
      export type Request = string;
      export interface Respons {
        data: IEntity.Book;
      }
    }
    export namespace Similar {
      export type Request = string;
      export interface Respons {
        items: IEntity.Book[];
      }
    }
  }
}
