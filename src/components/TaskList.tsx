import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { FaBitcoin, FaDollarSign, FaGift } from 'react-icons/fa';
import { SiEthereum } from 'react-icons/si';

export function TaskList() {
  const { tasks, claimTaskReward } = useGameStore();

  const getMinerIcon = (type: string) => {
    switch (type) {
      case 'EMSX':
        return <SiEthereum className="text-blue-400" />;
      case 'USDT':
        return <FaDollarSign className="text-green-400" />;
      case 'BTC':
        return <FaBitcoin className="text-yellow-400" />;
      default:
        return null;
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="glass-card rounded-xl p-6 text-center text-gray-400">
        No tasks available at the moment
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <motion.div
          key={task.id}
          className="glass-card rounded-xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">{task.title}</h3>
              <p className="text-sm text-gray-400">{task.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-sm">
                <FaGift className="text-purple-400" />
                <span className="font-bold">
                  Lvl {task.reward.level} {task.reward.type}
                </span>
                {getMinerIcon(task.reward.type)}
              </div>
              {task.completed && (
                <button
                  onClick={() => claimTaskReward(task.id)}
                  className="btn-primary py-1 px-3 text-sm"
                >
                  Claim
                </button>
              )}
            </div>
          </div>
          <div className="mt-2 w-full bg-gray-800 rounded-full h-2">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                task.completed ? 'bg-green-400' : 'bg-blue-400'
              }`}
              style={{ width: task.completed ? '100%' : '0%' }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}