export default function Table({tbodyData, highlightedRow=[], setHighlightedRow=[]}) {
    // select the table row 
    const ClickHighlight = (e,index) => {
        // first test if highlightedRow is a parameter
            // if already highlighted remove else set
            if (highlightedRow === index) {
                setHighlightedRow(-99);
            } else {
                setHighlightedRow(index);
            }
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
        width: '1200px',
        height: '200px',
        overflow: 'scroll'
    };

    return (
        <div style={myComponent}>
            <table>
                <thead>
                    <tr>
                    {theadData.map((heading, count) => {
                        return <th key={heading}>{heading}</th>
                    })}
                    </tr>
                </thead>
                <tbody>
                    {tbodyData.map((row, index) => {
                        return <tr key={index} onMouseDown={(e) => ClickHighlight(e,index)} 
                            style={ (index === highlightedRow) ? { backgroundColor: 'cyan' } : {}}
                        >
                            {theadData.map((key, index) => {
                                return <td key={row[key]}>{row[key]}</td>
                            })}
                        </tr>;
                    })}
                </tbody>
            </table>
        </div>
    );
}