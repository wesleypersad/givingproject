export default function Table({tbodyData}) {
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
                    return <tr key={index}>
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