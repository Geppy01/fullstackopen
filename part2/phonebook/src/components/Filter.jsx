const Filter = (props) => {
    return(
        <div>
            filter shown with <input
            value={props.valueFilter}
            onChange={props.onChangeFilter}
            />
        </div>
    )
}

export default Filter