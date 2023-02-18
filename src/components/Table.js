export default function Table({tbodyData, highlightedRow, setHighlightedRow}) {
    // get today's date for key value
    const date = new Date();

    // select the table row 
    const ClickHighlight = (e,index) => {
        // check if (set)highlightedRow passed
        if (highlightedRow && setHighlightedRow) {
            // if already highlighted remove else set
            if (highlightedRow === index) {
                setHighlightedRow(-99);
            } else {
                setHighlightedRow(index);
            }
        };
    };

    // define function to the get keys from json data
    const getHeadings = (json) => {
        return Object.keys(json[0]);
    };

    // get an array of keys for the table header
    const theadData = getHeadings(tbodyData);

    const myComponent = {
        color: 'blue',
        background: 'gold',
        width: '90%',
        maxheight: '100px',
        overflow: 'scroll'
    };

    return (
        <div style={myComponent}>
            <table>
                <thead>
                    <tr>
                    {theadData.map((heading) => {
                        return <th key={heading}>{heading}</th>
                    })}
                    </tr>
                </thead>
                <tbody>
                    {tbodyData.map((rowdata, index) => {
                        return <tr key={rowdata._id} onMouseDown={(e) => ClickHighlight(e,index)} 
                            style={ (index === highlightedRow) ? { backgroundColor: 'cyan' } : {}}
                        >
                            {theadData.map((key, column) => {
                                // make the key unique by adding index
                                return <td key={rowdata[key]+column}>{rowdata[key]}</td>
                            })}
                        </tr>;
                    })}
                </tbody>
            </table>
        </div>
    );
}