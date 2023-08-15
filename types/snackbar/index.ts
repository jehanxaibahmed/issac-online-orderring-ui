export interface Snackbar {
    content: string,
    color?: string,
    btn_color?: string,
    show: boolean,
    vertical?: boolean,
    variant?: any,
    timeout?: string,
    multiline?: any,
    location?: any
}


export const defaultSnackbar: Snackbar = {
    content: '',
    color: 'primary',
    btn_color: 'red',
    show: false,
    vertical: false,
    variant:"",
    timeout: '3000',
    multiline: false,
    location: "bottom"
};