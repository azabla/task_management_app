<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;

class PostController extends Controller
{

    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum')
        ];
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
{
    // Only fetch tasks that belong to the authenticated user
    return Task::with('user')
               ->where('user_id', auth()->id())  // Filter by authenticated user
               ->latest()  // Sort by the latest tasks
               ->get();  // Fetch the tasks
}

    

    

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the input including status and due_date
        $fields = $request->validate([
            'title' => 'required|max:255',
            'body' => 'required',
            'status' => 'required|string',
            'due_date' => 'nullable|date'
        ]);
    
        // Create the task
        $task = $request->user()->tasks()->create($fields);
    
        return ['task' => $task, 'user' => $task->user];
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        return ['task' => $task, 'user' => $task->user];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {
        // Authorize the user to modify the task
        Gate::authorize('modify', $task);

        // Validate the input including status and due_date
        $fields = $request->validate([
            'title' => 'required|max:255',
            'body' => 'required',
            'status' => 'required|string',  // Validate status
            'due_date' => 'nullable|date',  // Validate due_date
        ]);

        // Update the task with the new fields
        $task->update($fields);

        return ['task' => $task];
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        Gate::authorize('modify', $task);

        $task->delete();

        return ['message' => 'The task was deleted'];
    }
}
