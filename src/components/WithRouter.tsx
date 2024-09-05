"use client";
import {useRouter, usePathname} from "next/navigation";

export default function WithRouter(WrappedComponent: any) {

    // 新组件，包含增强功能
    return function EnhancedComponent(props:any) {
        const router = useRouter()
        const pathname = usePathname()

        // const {loadingKey} = useSelector(state => state.system)
        // 在此可以添加额外的逻辑，比如处理props、订阅等
        const newProps = {
            ...props,
            // 添加自定义属性
            routerPush: (url: string) => {
                // 相同的地址不需要跳转
                if (url !== pathname){
                    console.log('开始跳转了')
                    // dispatch(setProgress({
                    //     isRouteChanging: true,
                    //     loadingKey: loadingKey ^ 1
                    // }))
                    router.push(url)
                }
            }
        };

        // 渲染传入的组件，并传递新的props
        return <WrappedComponent {...newProps} />;
    };
}