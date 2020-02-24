import React from 'react';
import CustomLoading from 'components/CustomLoading/CustomLoading';

export default function withLoading({
  test = props => {
    return props.isLoading;
  },
  loadingComponent = CustomLoading
} = {}) {
  return BaseComponent => {
    return class Wrapper extends React.Component {
      render() {
        const isLoading = test(this.props);
        const LoadingComponent = loadingComponent;
        // const overlay = {
        //   position: 'relative',
        //   height: '100%',
        //   width: '100%',
        //   // opacity: 0.7,
        //   zIndex: 20,
        //   pointerEvents: 'none',
        //   backgroundColor: 'transparent'
        // };
        return (
          <div>
            {!!isLoading && <LoadingComponent />}
            <BaseComponent {...this.props} />
          </div>
        );
      }
    };
  };
}
