import React, { Component } from 'react'
import { list } from './apiMai'
import { isauthenticated } from '../auth';
import Results from './Results'

class Search extends Component {
    state = {
        query: '',
        results: []
    }

    getInfo = () => {
        const userId = this.query;
        const token = isauthenticated().token;
        list(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ results: data })
            }
        })
    }

    handleInputChange = () => {
        this.setState({
            query: this.search.value
        }, () => {
            if (this.state.query && this.state.query.length > 1) {
                if (this.state.query.length % 2 === 0) {
                    this.getInfo()
                }
            }
        })
    }

    render() {
        return (
            <div className="container">
                <form>
                    <input className="form-control"
                        placeholder="Enter Email"
                        ref={input => this.search = input}
                        onChange={this.handleInputChange}
                        aria-label="Search"
                    />
                    <Results results={this.state.results} />
                </form>

            </div>

        )
    }
}

export default Search