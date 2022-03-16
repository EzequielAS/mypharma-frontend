import { createGlobalStyle } from 'styled-components'
import 'react-toastify/dist/ReactToastify.css'

export default createGlobalStyle`
    :root{
        --gray900: #181B23;
        --gray800: #1F2029;
        --gray700: #353646;
        --gray600: #4B4D63;
        --gray500: #616480;
        --gray400: #797D9A;
        --gray300: #9699B0;
        --gray200: #B3B5C6;
        --gray100: #D1D2DC;
        --gray50: #EEEEF2;

        --green900: #007580;
        --green400: #00a8b8;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;
    }

    html{
        text-rendering: optimizeLegibility;
        @media (max-width: 1080px){
            font-size: 93.75%;
        }
        @media (max-width: 720px){
            font-size: 87.5%;
            
        }
    }

    body {
        background: var(--gray900);
        color: var(--gray50);
        -webkit-font-smoothing: antialiased;   
       
        /* &::-webkit-scrollbar-track {
            background-color: #FFF;
        }
        &::-webkit-scrollbar {
            width: 5px;
        }
        &::-webkit-scrollbar-thumb {
            background: #C3C3C3;
            border-radius: 4px;
        }
        scrollbar-width: thin;
        scrollbar-color: #C3C3C3;
        scrollbar-track-color: #FFF; */
    }

    body, input, button {
        font-family: 'Ubuntu', sans-serif;
        font-weight: 400;
    }

    button {
        cursor: pointer;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    [disabled]{
        opacity: 0.6;
        cursor: not-allowed;
    }
`;