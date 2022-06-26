import FormTable from './components/formTable/Index';

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

