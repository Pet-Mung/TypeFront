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