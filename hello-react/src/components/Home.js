import React,{Component} from 'react';
import PropTypes from 'prop-types';

export class Home extends Component {
    // 从父组件传过来的props
    constructor(props) {
        super(props);// 执行父类的构造方法
        this.state = {
            age:props.initialAge,
            status:0,
            homeLink:"Changed Link"
        }
        setTimeout(()=>{
            this.setState({
                status:1
            })
        },3000)
    }
    onMakeOlder() {
        this.setState({
            age:this.state.age+3
        })
    }
    handleGreet() {
        this.props.greet(this.state.age)
    }
    onChangeLink() {
        this.props.changeLink(this.state.homeLink);
      }
    render() {
        console.log('this',this)
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-1 col-xs-offset-11">
                        <div>your name is {this.props.name},your age is{this.state.age}</div>
                            <p>{this.state.status}</p>
                        {/* ()代表执行，这里需要的是一个函数，所以不需要括号 */}
                        <button onClick={()=>{this.onMakeOlder()}} className="btn btn-primary">Make me older</button>
                         <hr/>
                         <button onClick={this.handleGreet.bind(this)} className="btn btn-primary">Greet</button>
                         <hr/>
                         <button onClick={this.onChangeLink.bind(this)} className="btn btn-primary">Change Header</button>
                    </div>
                </div>
            </div>
        )
    }
}

Home.propTypes = {
    name: PropTypes.string,
    initialAge: PropTypes.number,
    user: PropTypes.object,
    greet: PropTypes.func,
    initialName: PropTypes.string,
  };
  