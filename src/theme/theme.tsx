interface Theme {
  colors: {
    primary: string;
    secondary: string;
    fontPrimary: string;
    fontSecondary: string;
  };
  typograpghy: {
    mainFont: string;
  };
  fontWeight: {
    regular: string;
    medium: string;
    semiBold: string;
  };
}

const mainTheme: Theme = {
  colors: {
    primary: '#C9A899',
    secondary: '#844704',
    fontPrimary: '#FFFFFF',
    fontSecondary: '#2B2B2B',
  },
  typograpghy: {
    mainFont: '"Poppins", sans-serif',
  },
  fontWeight: {
    regular: '400',
    medium: '500',
    semiBold: '600',
  },
};

export default mainTheme;
