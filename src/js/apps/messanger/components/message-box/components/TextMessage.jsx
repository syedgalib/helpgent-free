
import Linkify from 'Externals/Linkify.jsx';

const TextMessage = ({data}) => {
	return (
		<div className='wpwax-vm-message-content__inner--text'>
			<p><Linkify>{data.message}</Linkify></p>
		</div>
	)
}

export default TextMessage;
