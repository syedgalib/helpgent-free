import FormTable from './components/form-table/Index.jsx';

const BuilderContainer = () => {
    return(
        <div className="wpwax-vm-page-inner">
			<FormTable />
        </div>
    )
}

function App() {
	return (
        <BuilderContainer />
	);
}

export default App;

