import React from "react";

export default class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="product">
                <div className="product-header">
                    <h1>Nimi</h1>{" "}
                    <img
                        className="logo-normal"
                        src="https://i.ytimg.com/vi/3dcli9i_pvA/hqdefault.jpg"
                    ></img>
                </div>
                <div>
                    <p>
                        lorem ipsum olen lyhyt kuvaus tuotteesta x jota ei ole
                        olemassa nyt
                    </p>
                </div>
                <div>
                    <p>
                        Olen pitkä kuvaus heipatihei Lorem Ipsum is simply dummy
                        text of the printing and typesetting industry. Lorem
                        Ipsum has been the industry's standard dummy text ever
                        since the 1500s, when an unknown printer took a galley
                        of type and scrambled it to make a type specimen book.
                        It has survived not only five centuries, but also the
                        leap into electronic typesetting, remaining essentially
                        unchanged. It was popularised in the 1960s with the
                        release of Letraset sheets containing Lorem Ipsum
                        passages, and more recently with desktop publishing
                        software like Aldus PageMaker including versions of
                        Lorem Ipsum.
                    </p>
                    <ul>
                        <li>olen teknologia 1</li>
                        <li>olen teknologia 2</li>
                        <li>olen teknologia 3</li>
                    </ul>
                    <ul>
                        <li>olen komponentti 1</li>
                        <li>olen komponentti 2</li>
                        <li>olen komponentti 3</li>
                    </ul>
                    <p>Olen ympäristön vaatimus</p>
                    <p>olen asiakas</p>
                    <p>elinkaaren vaihe</p>
                    <p>omistava liiketoiminta</p>
                    <p>hinnoittelu</p>
                </div>
            </div>
        );
    }
}
