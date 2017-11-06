const React = require('react');
const queryString = require('query-string');
const Link = require('react-router-dom').Link;
const api = require('../utils/api');
const PlayerPreview = require('./PlayerPreview');
const Loading = require('./Loading');

function Profile(props) {
    const info = props.info;

    return (
        <PlayerPreview
            username={info.login}
            avatar={info.avatar_url}>
                <ul className='space-list-items'>
                    {info.name && <li>{info.name}</li>}
                    {info.location && <li>{info.location}</li>}
                    {info.company && <li>{info.company}</li>}
                    <li>Followers: {info.followers}</li>
                    <li>Following: {info.following}</li>
                    <li>Public Repos: {info.public_repos}</li>
                </ul>
        </PlayerPreview>
    )
}

function Player(props) {
    return (
        <div>
            <h1 className='header'>{props.label}</h1>
            <h3 style={{textAlign: 'center'}}>Score: {props.score}</h3>
            <Profile info={props.profile} />
        </div>
    )
}

class Results extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            winner: null,
            loser: null,
            error: null,
            loading: true
        }
    }

    componentDidMount() {
        const players = queryString.parse(this.props.location.search);

        api.battle([
            players.playerOneName,
            players.playerTwoName
        ]).then(function (players) {
            if (players === null) {
                return this.setState(function () {
                    return {
                        error: 'Check the both users on GitHub',
                        loading: false
                    }
                });
            }

            this.setState(function () {
                return {
                    winner: players[0],
                    loser: players[1],
                    error: null,
                    loading: false
                }
            })
        }.bind(this));
    }

    render() {
        const error = this.state.error;
        const winner = this.state.winner;
        const loser = this.state.loser;
        const loading = this.state.loading;

        if (loading === true) {
            return <Loading />
        }

        if (error) {
            return (
                <div>
                    <p>{error}</p>
                    <Link to='/battle'>Reset</Link>
                </div>
            )
        }

        return (
            <div className='row'>
                <Player
                    label='Winner'
                    score={winner.score}
                    profile={winner.profile}
                />

                <Player
                    label='Loser'
                    score={loser.score}
                    profile={loser.profile}
                />
            </div>
        )
    }
}

module.exports = Results;