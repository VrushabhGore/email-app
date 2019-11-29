import React from 'react'

const Results = (props) => {
  const options = props.results.map(mail => (
    <div className="card col-md-12" key={mail._id}>
                        <div className="card-body">
                            <h5 className="card-title">Subject:{mail.subject}</h5>
                            <p className="card-text">Body:{mail.body}</p>
                            <p className="card-text">NAME: {mail.author.name}</p>
                            <p className="card-text">SEND BY:{mail.author.email}</p>
                            <p className="card-text">Date:{new Date(mail.created).toDateString()}</p>
                        </div>
                    </div>

  ))
  return <ul>{options}</ul>
}

export default Results;
