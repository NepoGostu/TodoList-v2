import React, {ChangeEvent, useCallback} from 'react'
import {Checkbox, IconButton} from '@material-ui/core'
import {EditableSpan} from '../../../../components/EditableSpan/EditableSpan'
import {Delete} from '@material-ui/icons'
import {TaskStatuses, TaskType} from '../../../../api/todolists-api'
import {removeTaskTC, TasksStateType, updateTaskTC} from '../../tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../../../app/store';

type TaskPropsType = {
    task: TaskType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {
    const dispatch = useDispatch()


    const onChangeHandler =(e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        dispatch(updateTaskTC(props.task.id, {status: newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New},  props.todolistId))
    }

    const onTitleChangeHandler = useCallback((newValue: string) => {
        dispatch(updateTaskTC(props.task.id, {title: newValue}, props.todolistId))
    }, [props.task.id, props.todolistId]);

    return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
        <Checkbox
            checked={props.task.status === TaskStatuses.Completed}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={() => {
            dispatch(removeTaskTC(props.task.id, props.todolistId))
        }}>
            <Delete/>
        </IconButton>
    </div>
})
