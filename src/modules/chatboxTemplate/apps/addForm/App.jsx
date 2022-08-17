import { Provider } from 'react-redux';
import Form from './components/AddForm/Index.jsx';
import store from './redux/store';

const AddForm = () => {
    return(
        <div className="wpwax-vm-page-inner">
			<Form />
        </div>
    )
}

function App() {

	return (
        <Provider store={store}>
            
            <AddForm />
        </Provider>
        
	);
}

export default App;

