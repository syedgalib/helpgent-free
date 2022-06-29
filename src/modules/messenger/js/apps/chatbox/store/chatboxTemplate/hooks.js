import { useSelector } from "react-redux";

const canReplay = () => {

    const { templateOptions, supportedReplayTypes } = useSelector( state => {
        return {
            templateOptions: state.chatboxTemplate.template.options,
			supportedReplayTypes: state.chatboxTemplate.supportedReplayTypes,
        };
    });

    if ( ! templateOptions.can_replay_in ) {
        return false;
    }

    if ( ! Array.isArray( templateOptions.can_replay_in ) ) {
        return false;
    }

    const _supportedReplayTypes = supportedReplayTypes.map( item => item.type );

    for ( const replayType of templateOptions.can_replay_in ) {
        if ( _supportedReplayTypes.includes( replayType ) ) {
            return true;
        }
    }

    return false;
}

export { canReplay };