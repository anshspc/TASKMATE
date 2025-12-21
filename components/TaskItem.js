import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const formatTime = (isoString) => {
  if (!isoString) return 'Prior Task';
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return 'Prior Task';
    
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (isToday) {
      return `Today, ${timeStr}`;
    }
    
    const options = { month: 'short', day: 'numeric' };
    const dateStr = date.toLocaleDateString([], options);
    return `${dateStr} • ${timeStr}`;
  } catch (e) {
    return 'Prior Task';
  }
};

const TaskItem = (props) => {
    return (
        <TouchableOpacity onPress={props.onToggle} onLongPress={props.onDelete} delayLongPress={500}>
            <View style={styles.item}>
                <View style={styles.itemLeft}>
                    <View style={[
                        props.isCompleted ? styles.squareCompleted : styles.square,
                        !props.isCompleted && (
                            props.priority === 'High' ? { backgroundColor: '#FF8A8A' } :
                                props.priority === 'Medium' ? { backgroundColor: '#FFC069' } :
                                    { backgroundColor: '#55BCF6' } // Default Low
                        )
                    ]}></View>
                    <View style={styles.contentContainer}>
                        <Text style={[styles.itemText, props.isCompleted && styles.itemTextCompleted]}>
                            {props.text}
                        </Text>
                        <View style={styles.metaContainer}>
                            <Text style={styles.dateText}>
                                🕒 {formatTime(props.createdAt)}
                            </Text>
                            {props.timing && props.timing !== 'None' && (
                                <View style={styles.timingBadge}>
                                    <Text style={styles.timingText}>⏱️ {props.timing}</Text>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
                <View style={styles.circular}></View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 1,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 10,
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: '#55BCF6',
        opacity: 0.4,
        borderRadius: 6,
        marginRight: 15,
    },
    squareCompleted: {
        width: 24,
        height: 24,
        backgroundColor: '#55BCF6',
        opacity: 1,
        borderRadius: 6,
        marginRight: 15,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    itemText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1B1B1D',
        marginBottom: 2,
    },
    itemTextCompleted: {
        textDecorationLine: 'line-through',
        color: '#8F90A6',
    },
    metaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    dateText: {
        fontSize: 11,
        color: '#8F90A6',
        marginRight: 8,
        fontWeight: '500',
    },
    timingBadge: {
        backgroundColor: '#F0ECF9',
        paddingVertical: 1,
        paddingHorizontal: 6,
        borderRadius: 6,
    },
    timingText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#4A3780',
    },
    circular: {
        width: 12,
        height: 12,
        borderColor: '#55BCF6',
        borderWidth: 2,
        borderRadius: 6,
    },
});

export default TaskItem;
