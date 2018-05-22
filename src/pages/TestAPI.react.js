import React from 'react';
import { withRouter } from 'react-router-dom';
import AjaxUtils from 'utils/AjaxUtils';
import Helmet from 'react-helmet';

import LibraryLoader from 'utils/LibraryLoader';

class TestAPI extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
            requestType: 'GET',
            url: ''
		}

        this.onSubmit = this.onSubmit.bind(this);

		this.libraryLoader = new LibraryLoader();
	}

	componentDidMount() {
		const self = this;

		this.libraryLoader.loadLibrary('plugins/jsoneditor/jsoneditor.min.js', () => {
			self.editor = new JSONEditor(document.getElementById("jsoneditor"), { mode: 'code' });
			self.viewer = new JSONEditor(document.getElementById("jsonviewer"), { mode: 'view' });
		})
	}

    onSubmit(e) {
        e.preventDefault();

        const self = this;

        AjaxUtils.request(this.state.requestType, this.state.url, JSON.parse(this.editor.getText()),
            (data) => {
                console.log(data);
                self.viewer.setText(JSON.stringify(data, null, 4));
                self.setState(self.state);
            },
            (data) => {
                console.log(data);
                self.viewer.setText(JSON.stringify(data, null, 4));
                self.setState(self.state);
            }
        )
    }

	render() {
	    return [
			<Helmet key="helmet">
				<link rel="stylesheet" type="text/css" href="plugins/jsoneditor/jsoneditor.min.css"/>
			</Helmet>,
            <div key="main" className="container-fluid">
                <div className="row">
                    <div className="col-12 col-sm-6">
                        <form onSubmit={this.onSubmit}>
                            <br/>
                            <input type="text" className="form-control" placeholder="Request type" value={this.state.requestType} onChange={(e) => { this.state.requestType = e.target.value; this.setState(this.state); }}/>
                            <input type="text" className="form-control" placeholder="URL" value={this.state.url} onChange={(e) => { this.state.url = e.target.value; this.setState(this.state); }}/>
                            <div id="jsoneditor" style={{ width: '100%', height: '400px'}}></div>
                            <br/>
                            <button className="btn btn-success btn-block" type="submit">Send</button>
                        </form>
                    </div>
                    <div id="jsonviewer" className="col-12 col-sm-6"></div>
                </div>
            </div>
        ]
	}
};

export default withRouter(TestAPI)
