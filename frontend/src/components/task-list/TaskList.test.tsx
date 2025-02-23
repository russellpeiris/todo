import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TaskList } from './TaskList'; 
import { useCompleteTask, useGetTasks } from '../../hooks/tasks';
import "@testing-library/jest-dom"

vi.mock('../../hooks/tasks', () => ({
  useGetTasks: vi.fn(),
  useCompleteTask: vi.fn(),
}));

describe('TaskList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders tasks when data is loaded', async () => {
    const mockTasks = [
      { id: 1, title: 'Task 1', description: 'Description 1' },
      { id: 2, title: 'Task 2', description: 'Description 2' },
    ];
    vi.mocked(useGetTasks).mockReturnValue({
      data: mockTasks,
      isLoading: false,
    })

    vi.mocked(useCompleteTask).mockReturnValue({
      complete: vi.fn(),
      updating: false,
    });

    render(<TaskList />);

    await waitFor(() => {
      expect(screen.getByText('Task 1')).toBeInTheDocument();
      expect(screen.getByText('Task 2')).toBeInTheDocument();
      expect(screen.getByText('Description 1')).toBeInTheDocument();
      expect(screen.getByText('Description 2')).toBeInTheDocument();
    });
  });

  it('calls complete function when Done button is clicked', async () => {
    const mockTasks = [{ id: 1, title: 'Task 1', description: 'Description 1' }];
    const mockComplete = vi.fn();
    
    vi.mocked(useGetTasks).mockReturnValue({
      data: mockTasks,
      isLoading: false,
    })

    vi.mocked(useCompleteTask).mockReturnValue({
      complete: mockComplete,
      updating: false,
    });

    render(<TaskList />);

    const doneButton = screen.getByText('Done');
    doneButton.click();

    await waitFor(() => {
      expect(mockComplete).toHaveBeenCalledWith(1);
    });
  });
});