import FormTable from './components/FormTable/Index';

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

