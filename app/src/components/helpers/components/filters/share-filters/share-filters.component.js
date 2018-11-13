import React from "react";
import autobind from "autobind-decorator";
import { CopyToClipboard } from "react-copy-to-clipboard";

import "./share-filters.scss";

/**
* @property {Function} setShareFilters in filters.action
* @property {String} resetFilter in filters reducer
* @property {String} selectedOption in filters reducer
*/
class ShareFilters extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasShareLink: false,
        };
    }

    /**
     * shows confirmation message
     * @memberof ShareFilters
     */
    @autobind
    handleClick() {
        this.setState({
            hasShareLink: true,
        });

        setTimeout(() => {
            this.setState({
                hasShareLink: false,
            });
        }, 1000);
    }


    /**
     * @property { String } toShareFilters in share-filters.reducer
     * @memberof ShareFilters
     */
    render() {
        const shareConfirmation = this.state.hasShareLink ?
            <span styleName="confirmation">
                link copied
            </span> : "";

        let shareLink;
        try {
            const items = btoa(
                JSON.stringify(this.props.toShareFilters)
            );
            shareLink = `http://${window.location.hostname
                }/charter/?filter=${items}`;
        } catch (error) {
            shareLink = "Something went wrong while creating the link";
        }

        return <div styleName="wrapper"
            onClick={this.handleClick}>

            <CopyToClipboard text={shareLink}
                onCopy={() => this.setState({ copied: true, })}>
                <span styleName="button">
                    <span className="ahoyclub-share"></span>
                    Share
                </span>
            </CopyToClipboard>

            {shareConfirmation}
        </div >;
    }
}

export default ShareFilters;