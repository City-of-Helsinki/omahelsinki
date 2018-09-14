import React, {Component} from 'react';
import {ButtonGroup, Button} from 'reactstrap'
import {connect} from 'react-redux'
import classnames from 'classnames'

class HelCheckbox extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedFields: [],
            interestTopics: [],
        }
    }

    componentDidMount(){
        fetch('https://profile-api.test.hel.ninja/profile-test/v1/interest-concept/')
            .then(response=>response.json())
            .then(response=>{
                this.setState({
                    interestTopics:response.results,
                })
            })
            .catch(error=>console.log(error))
    }

    onSelect = (selected) => {
        const {selectedFields} = this.state

        const index = selectedFields.indexOf(selected);
        if (index < 0) {
            selectedFields.push(selected);
        } else {
            selectedFields.splice(index, 1);
        }
        this.setState({selectedFields: [...selectedFields]});
    }

    render() {
        const {data, direction} = this.props
        const {selectedFields} = this.state
        const interestTopics = this.state.interestTopics.map((interestTopic, i)=>interestTopic.label[this.props.locale])
        const interests = data.map(interest=>interest.label)
        const preIntrests = new Set(interests)
        const diff = [...new Set([...interestTopics].filter(interest=>!preIntrests.has(interest)))]
        return (
            <div className={classnames('hel-checkbox', {'horizontal': direction === 'horizontal', 'vertical': direction === 'vertical'})}>
                <ButtonGroup>
                    {data.map((d, index) => {
                        return (
                            <Button 
                                onClick={() => this.onSelect(d)}
                                key={index}
                                active={selectedFields.includes(d)}
                            >{d.label}</Button>
                            // TODO: use translation in label
                        )
                    })}
                </ButtonGroup>
                <ButtonGroup>
                    {diff.map((d, index) => {
                        return (
                            <Button 
                                onClick={() => this.onSelect(d)}
                                key={index}
                                active={selectedFields.includes(d)}
                            >{d}</Button>
                        )
                    })}
                </ButtonGroup>
            </div>
        );
    }
}

HelCheckbox.defaultProps = {
    direction: 'vertical',
}

const mapStateToProps = state =>{
    return{
        locale: state.intl.locale,
    }
}

export default connect(mapStateToProps)(HelCheckbox)
