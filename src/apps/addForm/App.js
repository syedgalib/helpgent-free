import { Provider } from 'react-redux';
import store from './redux/store';
import Form from './components/AddForm/Index';

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

