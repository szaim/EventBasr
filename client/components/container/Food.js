const React = require('react');
const CardEvent = require('../cardEvent');
const connect = require('react-redux').connect;
const actions = require('../../redux/action');


const Food = React.createClass({

	componentWillMount: function() {
		this.props.dispatch(actions.fetchFood('40.7,-74'));
	},

	render: function() {
	    let settings = {
			  slideRatio: 4,
			  slidePending: true
	    };
		let foodList = this.props.food.map((event,index) => {
			let prefix;
			let suffix;
			//if no photos set default image
			if(!event.venue.photos.groups.length){
				prefix = 'https://igx.4sqi.net/img/general/'; 
				suffix = '/48623284_fqbPs5xy6jImyJu6U2w_xkkR7lilKCVfZEE8qSC66WU.jpg';
			} else {
				prefix = event.venue.photos.groups[0].items[0].prefix;
				suffix = event.venue.photos.groups[0].items[0].suffix;
			}
			return (
				<CardEvent 
				key={index}
				prefix={prefix} 
				suffix={suffix}
				title={event.venue.name}
				rating={event.venue.rating}/>
			)
		});
		return (
				<div className="Container">
					<h1>Food & Drink</h1>
						<div className="row">
							<div className="slider responsive">
								{foodList}
							</div>
						</div>
						<div className="prev">
							<span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
						</div>
						<div className="next">
							<span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
						</div>
				</div>
		)
	}
});

let mapStateToProps = function(state, props) {
	return {
		food: state.food
	}
};



const Container = connect(mapStateToProps)(Food);

module.exports = Container;