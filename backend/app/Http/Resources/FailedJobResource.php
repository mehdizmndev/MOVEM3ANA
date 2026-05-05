<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FailedJobResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->id,
            'uuid'       => $this->uuid,
            'connection' => $this->connection,
            'queue'      => $this->queue,
            'payload'    => json_decode($this->payload, true),
            'exception'  => $this->exception,
            'failed_at'  => $this->failed_at?->toISOString(),
        ];
    }
}
