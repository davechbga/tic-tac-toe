// me guardo el estado de cada cuadrado
export const Square = ({ children, isSelected, updateBoard, index }) => {
    // me guardo el estado de cada cuadrado
    const className = `square ${isSelected ? 'is-selected' : ''}`
    const handleClick = () => {
        updateBoard(index)
    }
    return (
        <div onClick={handleClick} className={className}>
            {children}
        </div>
    )
}