import Styled from 'styled-components';

const TemplateBox = Styled.div`
    border-radius: 10px;
    padding: 20px;
    background-color: var(--color-white);
    a{
        &:focus{
            outline: none;
            box-shadow: 0 0;
        }
    }
    .wpwax-vm-table-wrap{
        position: relative;
        min-height: 200px;
        .wpwax-vm-loading-spin{
            position: absolute;
            left: 50%;
            top: 50%;
            z-index: 101;
        }
        .wpwax-vm-modal{
            .wpwax-vm-modal__body{
                text-align: center;
                p{
                    font-weight: 600;
                    font-size: 18px;
                    color: var(--color-dark);
                }
            }
        }
    }
    .wpwax-vm-table{

		@media (min-width: 1000px) {
			table-layout: fixed;
		}

        tr {
            th {
				&.wpwax-vm-head-name {
					width: 200px;

					@media (min-width: 1150px) {
						width: 320px;
					}
				}
				&.wpwax-vm-head-shortcode {
					width: 210px;
				}
				&.wpwax-vm-head-status {
					width: 80px;
				}
				&.wpwax-vm-head-action {
					text-align: right;
				}
            }

			td.wpwax-vm-head-shortcode input {
				cursor: copy;
				border: 0;
				box-shadow: none;
				font-family: monospace;
				font-size: 12px;
				width: 190px;
				text-align: center;

				&:focus {
					outline: 0;
					border: 0;
					box-shadow: none;
				}
			}
        }
        .wpwax-vm-table-action{
            margin: -8px;
            text-align: right;
        }
        .wpwax-vm-btn{
            font-size: 14px;
            padding: 0 14px;
            margin: 8px;
            text-decoration: none;
            .dashicons{
                width: 15px;
                height: 15px;
                ${({ theme }) => (theme.direction === 'ltr' ? 'margin-right' : 'margin-left')}: 8px;
                position: relative;
                top: -4px;
            }
        }
    }
    .wpwax-vm-titlebox{
        display: flex;
        align-items: center;

		@media (min-width: 600px) {
			min-width: 200px;
		}

		.wpwax-vm-titlebox__data {
			padding-right: 20px;
		}
        .wpwax-vm-titlebox__name{
            display: none;
            font-weight: 500;
            // width: 250px;
            color: var(--color-dark);
            &.wpwax-vm-show{
                display: block;
            }
            span{
                display: block;
            }
            .wpwax-vm-titlebox__id{
                font-size: 13px;
                font-weight: 400;
                display: block;
                margin-top: 4px;
                color: var(--color-gray);
            }
        }
    }
    .wpwax-vm-titlebox__editor{
        display: none;
        &.wpwax-vm-show{
            display: flex;
        }
        input{
            border: 0 none;
            background-color: transparent;
            border-bottom: 1px solid var(--color-border-light);
			border-radius: 0;
			padding-left: 0;
			padding-right: 0;
            &:focus{
                outline: none;
                box-shadow: 0 0;
            }
        }

    }
    .wpwax-vm-titlebox__actions{
        margin-left: 10px;
        ${({ theme }) => (theme.direction === 'ltr' ? 'margin-left' : 'margin-right')}: 10px;
        a{
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            box-shadow: none;
            margin: 2px;
            transition-duration: 0.3s;
			transition-timing-function: ease;
			transition-property: background-color;
            text-decoration: none;
            &:focus,
			&:hover {
                outline: none;
                box-shadow: 0 5px 10px #adb4d260;
            }

			&.wpwax-vm-titlebox__editor--edit,
			&.wpwax-vm-titlebox__editor--cancel,
			&.wpwax-vm-titlebox__editor--yes {
				display: none;
				border: 1px solid;

				&.wpwax-vm-show {
                    display: inline-flex;
                }
			}

			&.wpwax-vm-titlebox__editor--cancel,
			&.wpwax-vm-titlebox__editor--yes {
				color: var(--color-white);
			}

            &.wpwax-vm-titlebox__editor--cancel {
                background-color: var(--color-danger);
                border-color: var(--color-danger);

                &:hover {
                    color: var(--color-danger);
                    border-color: var(--color-danger);
                    background-color: var(--color-white);
                }
            }
            &.wpwax-vm-titlebox__editor--yes {
                background-color: var(--color-success);
                border-color: var(--color-success);

                &:hover {
                    color: var(--color-success);
                    border-color: var(--color-success);
                    background-color: var(--color-white);
                }
            }

            &.wpwax-vm-titlebox__editor--edit {
				position: relative;
				top: -12px;
				color: var(--color-info);
				border-color: transparent;
                ${({ theme }) => (theme.direction === 'ltr' ? 'margin-left' : 'margin-right')}: 15px;

				&:hover {
					border-color: var(--color-white);
                    background-color: var(--color-white);
                }
            }

            .dashicons {
                position: relative;
                top: 2px;
				font-size: 16px;
				color: currentColor;
            }
        }
    }
`;

export default TemplateBox;