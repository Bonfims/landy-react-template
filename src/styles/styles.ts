import { createGlobalStyle } from "styled-components";
import { generate } from "@ant-design/colors";

interface ThemeColors {
    primaryPalette?: Array<string>;
    secondaryPalette?: Array<string>;
    inputBackground?: string;
    textColor?: string;
}

// Convertendo o hexadecimal para rgb para poder aplicar opacidade
const hexToRgb = (hex : string) => {
    // Remove o "#" do início, se presente
    hex = hex.replace('#', '');
  
    // Divide a string em valores R, G e B
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
  
    return `${r}, ${g}, ${b}`; // Retorna em formato "r, g, b"
};

// Função para gerar a paleta de cores 
export const generateColorPalette = (baseColor: string): Array<string> => {
    const colors = generate(baseColor);
    return colors;
};

const primaryPalette = generateColorPalette("#2e186a");
const secondaryPalette = generateColorPalette("#ff825c");
const inputBackground = "#f1f2f3";
const textColor = "#18216d";

export const Styles = createGlobalStyle<ThemeColors>`

    @font-face {
        font-family: "Motiva Sans Light";
        src: url("/fonts/Motiva-Sans-Light.ttf") format("truetype");
        font-style: normal;
    }

    @font-face {
        font-family: "Motiva Sans Bold";
        src: url("/fonts/Motiva-Sans-Bold.ttf") format("truetype");
        font-style: normal;
    }

    :root {
        /* Variáveis da cor primária */
        --primary-color: ${(props) => props.primaryPalette?.[5] ?? primaryPalette?.[5]};
        --primary-color-light-rgb: ${(props) => hexToRgb(props.primaryPalette?.[3] ?? primaryPalette?.[3])};
        --primary-color-light: ${(props) => props.primaryPalette?.[3] ?? primaryPalette?.[3]};
        --primary-color-dark: ${(props) => props.primaryPalette?.[7] ?? primaryPalette?.[7]};

        /* Variáveis da cor secundária */
        --secondary-color: ${(props) => props.secondaryPalette?.[5] ?? secondaryPalette?.[5]};
        --secondary-color-light: ${(props) => props.secondaryPalette?.[3] ?? secondaryPalette?.[3]};
        --secondary-color-dark: ${(props) => props.secondaryPalette?.[7] ?? secondaryPalette?.[7]};

        /* Outras variáveis */
        --input-background: ${(props) => props.inputBackground ?? inputBackground};
        --text-color: ${(props) => props.textColor ?? textColor };
    }

    body,
    html,
    a {
        font-family: 'Motiva Sans Light', sans-serif;
    }

    a:hover {
        color: var(--text-color);
    }

    body {
        margin:0;
        padding:0;
        border: 0;
        outline: 0;
        background: #fff;
        overflow-x: hidden;
    }

    input,
    textarea {
        border-radius: 4px;
        border: 0;
        background: var(--input-background);
        transition: all 0.3s ease-in-out;  
        outline: none;
        width: 100%;  
        padding: 1rem 1.25rem;

        :focus-within {
            background: none;
            box-shadow: var(--primary-color) 0px 0px 0px 1px;
        }
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-family: 'Motiva Sans Bold', serif;
        color: var(--text-color);
        font-size: 56px;
        line-height: 1.18;

        @media only screen and (max-width: 890px) {
          font-size: 47px;
        }
      
        @media only screen and (max-width: 414px) {
          font-size: 32px;
        }
    }

    p {
        color: var(--text-color);
        font-size: 21px;        
        line-height: 1.41;
    }

    h1 {
        font-weight: 600;
    }

    a {
        text-decoration: none;
        outline: none;
        color: var(--primary-color);

        :hover {
            color: var(--primary-color);
        }
    }
    
    *:focus {
        outline: none;
    }

    .about-block-image svg {
        text-align: center;
    }

    .ant-drawer-body {
        display: flex;
        flex-direction: column;
        text-align: left;
        padding-top: 1.5rem;
    }

    .ant-drawer-content-wrapper {
        width: 300px !important;
    }
`;
