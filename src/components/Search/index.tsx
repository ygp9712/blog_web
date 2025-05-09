import Styles from './index.module.css'
import React, { useState, useEffect, useRef} from 'react'
import Loading from '../loading/Loading'
import { Button, Modal, Input } from 'antd';
import { debounce, cloneByJson } from '../../utils/common';
import request from "@/utils/request";
import { useRouter } from 'next/navigation';

const Search = () => {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [searchResult, setSearchResult] = useState<any[] | null>([]); // 搜索结果
    const [loading, setLoading] = useState(false); // 加载状态
    const [nowIndex, setNowIndex] = useState(0); // 当前索引
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const handleClick = (obj: IBlogItem) => {
        console.log('点击了', obj);
        router.push(`/blog/${obj._id}`);
        setShowModal(false);
    };
    
    const handleCancel = () => {
        setShowModal(false);
    };

    const handleInput = debounce((e: string) => {
        handleSearch(e);
    }, 500)

    const handleSearch = (e: string) => {
        setSearchResult([]);
        setNowIndex(0);
        itemRefs.current = [];
        setLoading(true);
        const params = {
            keyword: e
        }
        request('api/blog/search', {
            method: 'POST', 
            body: params
        }).then(res => {
            console.log('搜索结果', res);
            setLoading(false);
            let copy = cloneByJson(res.Response.Result)
            setSearchResult(copy);
        }).catch(err => {
            setLoading(false);
            console.log('搜索失败', err);
        })
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (!searchResult) return;
        
        switch(e.key) {
            case 'ArrowUp':
                e.preventDefault();
                setNowIndex(prev => {
                    const newIndex = Math.max(0, prev - 1);
                    itemRefs.current[newIndex]?.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                    return newIndex;
                });
                break;
            case 'ArrowDown':
                e.preventDefault();
                setNowIndex(prev => {
                    const newIndex = Math.min(searchResult.length - 1, prev + 1);
                    itemRefs.current[newIndex]?.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                    return newIndex;
                });
                break;
            case 'Enter':
                e.preventDefault();
                if (searchResult[nowIndex]) {
                    // 这里可以添加选中项的处理逻辑
                    handleClick(searchResult[nowIndex]);
                    // console.log('选中:', searchResult[nowIndex]);
                }
                break;
        }
    };

    useEffect(() => {
        if (showModal) {
            window.addEventListener('keydown', handleKeyDown);
        } else {
            window.removeEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [showModal, searchResult, nowIndex]);
    return (
        <>
            <div className={Styles.search_container}>
                <i onClick={() => setShowModal(true)} className={Styles.icon + ' iconfont icon-sousuo'}></i>
            </div>
            <Modal
                title="搜索"
                open={showModal}
                // onOk={handleOk}
                onCancel={handleCancel}
                width={'80%'}
                footer={null}
            >
                <Input onChange={(e) => handleInput(e.target.value)} className={Styles.search_input} placeholder="请输入搜索内容" />
                <div className={Styles.search_main}>
                    {
                        !loading && <div className={Styles.search_result}>
                            {
                                searchResult && searchResult.map((item, index) => {
                                    return <div 
                                        onClick={() => handleClick(item)}
                                        key={index} 
                                        ref={el => itemRefs.current[index] = el}
                                        className={Styles.search_item+ ' ' + (nowIndex == index ? Styles.search_active : '')}>
                                            <b>[文章]</b>
                                            <span>{item.title}</span>
                                    </div>
                                })
                            }
                        </div>
                    }
                    {
                        loading && <Loading/>
                    }
                    {
                        (!searchResult || searchResult.length === 0) && !loading && <div className={Styles.search_empty}>暂无内容</div>
                    }
                </div>
                <div className={Styles.search_footer}>
                    <div>
                        <i className="iconfont icon-shangxiazuoyouTriangle111"></i>
                        <i className="iconfont icon-shangxiazuoyouTriangle19"></i>
                        <span>切换目标</span>
                    </div>
                    <div>
                        <i className="iconfont icon-huiche"></i>
                        <span>选择</span>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default Search