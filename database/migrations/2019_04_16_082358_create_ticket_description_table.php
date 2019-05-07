<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTicketDescriptionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ticket_description', function (Blueprint $table) {
            $table->increments('id'); 
            $table->unsignedInteger('event_id');
            $table->unsignedInteger('ticket_type_id');
            $table->string('name');
            $table->bigInteger('quantity');
            $table->integer('price');
            $table->text('description')->nullable();
            $table->timestamp('start_date_time')->nullable();
            $table->timestamp('end_date_time')->nullable();
            $table->unsignedInteger('minimum_tickets')->nullable();
            $table->unsignedInteger('maximum_tickets')->nullable();
            $table->enum('ticket_promoter_program', ['enable', 'disable'])->nullable();
            $table->timestamps();

            $table->foreign('event_id')->references('id')->on('events')->onDelete('cascade');
            $table->foreign('ticket_type_id')->references('id')->on('ticket_types')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ticket_description');
    }
}
