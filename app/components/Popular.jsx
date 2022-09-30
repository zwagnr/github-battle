import * as React from 'react';

function LanguagesNav({ selected, onUpdateLanguage }) {
  const languages = [
    'All',
    'CSS',
    'Javascript',
    'Ruby',
    'Java',
    'Rust',
    'Python',
    'GO',
  ];
  return (
    <select
      onChange={(e) => onUpdateLanguage(e.target.value)}
      selected={selected}
    >
      {languages.map((language) => (
        <option key={language} value={language}>
          {language}
        </option>
      ))}
    </select>
  );
}

export default class Popular extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: 'All',
    };
    this.updateLanguage = this.updateLanguage.bind(this);
  }
  updateLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage,
    });
  }
  render() {
    const { selectedLanguage } = this.state;
    return (
      <main>
        <LanguagesNav
          selected={selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        />

        {JSON.stringify(this.state, null, 2)}
      </main>
    );
  }
}
