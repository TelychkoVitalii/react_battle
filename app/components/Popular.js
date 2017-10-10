const React = require('react');

class Popular extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLanguage: 'All',
        };
        this.updateLanguage = this.updateLanguage.bind(this);
    }

    updateLanguage(lang) {
        this.setState(function () {
            return {
                selectedLanguage: lang
            }
        })
    }

    render() {
        const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];
        return (
            <div>
                <ul className='languages'>
                    {languages.map(function (lang) {
                        return <li onClick={this.updateLanguage.bind(null, lang)}
                                   key={lang}
                                   style={lang === this.state.selectedLanguage ? {color: '#d0021b'}: null}>
                            {lang}</li>
                    }, this)}
                </ul>
            </div>
        )
    }
}

module.exports = Popular;