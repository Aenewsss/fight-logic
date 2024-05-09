type TColors = 'gray' | 'amber' | 'red' | 'green' | 'blue' | 'white' | 'black'

interface IProps {
    text: string
    onClick?: any
    backgroundColor?: TColors
    color?: TColors
    disabled?: boolean
    type?: "button" | "submit" | "reset" | undefined
}

export default function Button({ text, onClick, backgroundColor = 'gray', color = 'white', disabled, type = "button" }: IProps) {

    function renderBgColor(color: TColors): string {
        switch (color) {
            case 'amber': return color
            case 'red': return color
            case 'green': return color
            case 'blue': return color
            case 'white': return color
            case "gray": return color
            case "black": return color
        }
    }

    function renderColor(color: TColors): string {
        switch (color) {
            case 'amber': return color
            case 'red': return color
            case 'green': return color
            case 'blue': return color
            case 'white': return color
            case "gray": return color
            case "black": return color
        }
    }

    return <button onClick={onClick} className={`px-4 py-1 rounded hover:scale-105 transition-all bg-${renderBgColor(backgroundColor)}-400 text-${renderColor(color)}`} type={type} disabled={disabled}>{text}</button>
}