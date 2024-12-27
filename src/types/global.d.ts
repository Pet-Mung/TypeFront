import { QuillEditor } from "vue3-quill";

interface AddressData {
  zonecode: string;
  roadAddress: string;
  detailAddress: string;
}

interface Postcode {
  open: () => void;
}

interface Window {
  daum: {
    Postcode: new (options: { oncomplete: (data: AddressData) => void }) => {
      open: () => void;
    };
  };
}

declare module "vue" {
  export interface GlobalComponents {
    QuillEditor: typeof QuillEditor;
  }
}