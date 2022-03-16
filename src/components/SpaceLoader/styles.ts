import styled from "styled-components"

export const Container = styled.div`
	display: block;
	position: relative;
	width: 3rem;
	height: 3rem;
	border-radius: 50%;
	border: 2px solid transparent;
	border-top-color: var(--gray50);
	-webkit-animation: spin 2s linear infinite;
	animation: spin 2s linear infinite;
    align-self: center;
    margin: 5rem auto;

    &:before {
        content: "";
        position: absolute;
        top: 5px;
        left: 5px;
        right: 5px;
        bottom: 5px;
        border-radius: 50%;
        border: 4px solid transparent;
        border-top-color: var(--gray50);
        -webkit-animation: spin 3s linear infinite;
        animation: spin 3s linear infinite;
    }

    &:after {
        content: "";
        position: absolute;
        top: 15px;
        left: 15px;
        right: 15px;
        bottom: 15px;
        border-radius: 50%;
        border: 4px solid transparent;
        border-top-color: var(--gray50);
        -webkit-animation: spin 1.5s linear infinite;
        animation: spin 1.5s linear infinite;
    }

    @-webkit-keyframes spin {
        0%   {
            -webkit-transform: rotate(0deg);
            -ms-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            -ms-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    
    @keyframes spin {
        0%   {
            -webkit-transform: rotate(0deg);
            -ms-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            -ms-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
`