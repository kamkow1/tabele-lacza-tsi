import axios from 'axios'
import React from 'react';
import parse from 'html-react-parser'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Table.css'

class Table extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            table: ''
        };
    }

    async componentDidMount() {
        const respTable = await fetchData();
        this.setState({table: respTable});
    }

    render() {
        return (
            <div>
                {parse(this.state.table)}
            </div>
        );
    }
}

async function fetchData() {
    const response = await axios.get('https://pl.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=1&page=Dane_statystyczne_o_miastach_w_Polsce&origin=*');

    const parser = new DOMParser();

    const text = response.data.parse.text['*'];

    const html =  parser.parseFromString(text, 'text/html');

    const table = html.querySelector('table');
    table.classList.add('table', 'table-dark', 'table-striped');

    let links = table.querySelectorAll('a');
    for (let link of links) {
        link.setAttribute('href', 'https://pl.wikipedia.org' + link.getAttribute('href'));
        link.classList.add('link-info');
        link.innerHTML = link.innerHTML.split('[')[0];
    }

    const xmlSerializer = new XMLSerializer();

    return xmlSerializer.serializeToString(table);
}

export default Table;