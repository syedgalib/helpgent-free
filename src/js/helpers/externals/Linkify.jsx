import ReactLinkify from 'react-linkify';

const Linkify = (props) => {
	return <ReactLinkify componentDecorator={(decoratedHref, decoratedText, key) => {
		return (
			<a href={decoratedHref} target='_blank' rel='noopener' key={key}>{decoratedText}</a>
		);
	}}>{props.children}</ReactLinkify>
}

export default Linkify;