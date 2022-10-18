import { useEffect, useState } from "react";

export function useScreenSize(dependencies = []) {
	const [size, setSize] = useState('large');
	const SCREEN_SIZES = {
		LARGE: 'large',
		MEDIUM: 'medium',
		TAB: 'tab',
		MOBILE: 'mobile',
	};

	useEffect(() => {
        function onWindowResize() {
			let innerWidth = window.innerWidth;

            if (innerWidth > 1400 && size !== SCREEN_SIZES.LARGE) {
                setSize(SCREEN_SIZES.LARGE);
            } else if (innerWidth > 1200 && innerWidth < 1400 && size !== SCREEN_SIZES.MEDIUM) {
                setSize(SCREEN_SIZES.MEDIUM);
            } else if (innerWidth > 992 && innerWidth < 1200 && size !== SCREEN_SIZES.TAB) {
                setSize(SCREEN_SIZES.TAB);
            } else if (innerWidth > 768 && innerWidth < 992 && size !== SCREEN_SIZES.MOBILE) {
                setSize(SCREEN_SIZES.MOBILE);
            }
        }

        window.addEventListener('resize', onWindowResize);

		// Initial resize call.
		onWindowResize();

		return () => window.removeEventListener('resize', onWindowResize);
    }, dependencies);

	return [size, SCREEN_SIZES]
}
