import { Provider } from 'react-redux';
import Form from './components/add-form/Index.jsx';
import store from './store/store';

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

